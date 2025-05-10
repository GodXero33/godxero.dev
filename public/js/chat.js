let ws = null;
const chatContent = document.getElementById('chat-content');
const newChatForm = document.getElementById('new-chat-start-form');
const newChatFormName = document.getElementById('new-chat-form-name');
const newChatFormConfirmBtn = document.getElementById('new-chat-name-confirm-btn');
const chatMessageInput = document.getElementById('chat-message-input');
const chatMessageSendBtn = document.getElementById('chat-message-send-btn');

let newChatOpenConfirmBtnListener = null;
let newChatStartListener = null;
let clientName = null;

function getUUID () {
	let uuid = localStorage.getItem('xero-chat-uuid');

	if (!uuid) {
		uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
		localStorage.setItem('xero-chat-uuid', uuid);
	}

	return uuid;
}

function openNewChatForm () {
	newChatForm.classList.remove('hide');

	newChatOpenConfirmBtnListener = () => {
		const name = newChatFormName.value;

		newChatForm.classList.add('hide');
		
		ws.send(JSON.stringify({
			type: 'new-chat',
			name
		}));

		clientName = name;
	};

	newChatFormConfirmBtn.removeEventListener('click', newChatOpenConfirmBtnListener);
	newChatFormConfirmBtn.addEventListener('click', newChatOpenConfirmBtnListener);
}

function startChat () {
	newChatStartListener = () => {
		if (chatMessageInput.value !== '' && ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({
				type: 'msg',
				msg: chatMessageInput.value
			}));

			const message = {
				message: chatMessageInput.value,
				time: new Date().toString()
			};

			chatContent.innerHTML += getChatBox(message, clientName);
			chatMessageInput.value = '';
			chatContent.scrollTop = chatContent.scrollHeight;
		}
	};

	chatMessageSendBtn.removeEventListener('click', newChatStartListener);
	chatMessageSendBtn.addEventListener('click', newChatStartListener);
}

function connectToChatServer () {
	ws = new WebSocket(`${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}?uuid=${getUUID()}`);

	ws.onmessage = (event) => {
		const msg = JSON.parse(event.data);

		if (msg.type === 'load-chat') {
			loadClientChat(msg.chat);
			startChat();

			clientName = msg.chat.client;
		} else if (msg.type === 'new-chat') {
			openNewChatForm();
		} else if (msg.type === 'start-chat') {
			startChat();
		}
	};

	ws.onopen = () => {
		// console.log('Connected to server');
	};

	ws.onclose = () => {
		// console.log('Disconnected from server');
	};
}

function disconnectFromChatServer () {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.close();
	}
}

function formatDateTime (isoString) {
	const timeData = new Date(isoString);
	const pad = num => String(num).padStart(2, '0');

	const hours = pad(timeData.getHours());
	const minutes = pad(timeData.getMinutes());
	const seconds = pad(timeData.getSeconds());
	const day = pad(timeData.getDate());
	const month = pad(timeData.getMonth() + 1);
	const year = timeData.getFullYear();

	return {
		time: `${hours} : ${minutes} : ${seconds}`,
		date: `${day}/${month}/${year}`
	};
}

function getChatBox (message, sender = null) {
	const { time, date } = formatDateTime(message.time);

	return `<div class="chat-box ${sender == null ? '' : 'client'}">
		<div class="time">
			<div>${time}</div>
			<div>${date}</div>
		</div>
		<div class="msg">${message.message}</div>
		<div class="sender">${sender ? sender : 'Sathish Shan'}</div>
	</div>`;
}

function loadClientChat (chat) {
	chatContent.innerHTML = '';

	const messages = chat.chat.sort((a, b) => new Date(a.time) - new Date(b.time));

	messages.forEach(message => {
		chatContent.innerHTML += getChatBox(message, message.fromClient === 1 ? chat.client : null);
	});

	chatContent.scrollTop = chatContent.scrollHeight;
}

document.getElementById('direct-message-btn').addEventListener('click', () => {
	connectToChatServer();
});

document.getElementById('chat-close-btn').addEventListener('click', () => {
	disconnectFromChatServer();

	newChatFormConfirmBtn.removeEventListener('click', newChatOpenConfirmBtnListener);
	chatMessageSendBtn.removeEventListener('click', newChatStartListener);
});

connectToChatServer();
