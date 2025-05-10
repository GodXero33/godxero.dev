let ws = null;
const chatContent = document.getElementById('chat-content');
const newChatForm = document.getElementById('new-chat-start-form');
const newChatFormName = document.getElementById('new-chat-form-name');
const newChatFormConfirmBtn = document.getElementById('new-chat-name-confirm-btn');

let newChatOpenConfirmBtnListener = null;

function getUUID () {
	let uuid = localStorage.getItem('xero-chat-uuid');

	if (!uuid) {
		uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
		localStorage.setItem('xero-chat-uuid', uuid);
	}

	return uuid;
}

function openNewChatForm () {
	return new Promise((resolve) => {
		newChatForm.classList.remove('hide');

		newChatOpenConfirmBtnListener = () => {
			const name = newChatFormName.value;

			newChatForm.classList.add('hide');
			resolve(name);
		};

		newChatFormConfirmBtn.addEventListener('click', newChatOpenConfirmBtnListener);
	});
}

function connectToChatServer () {
	ws = new WebSocket(`${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}?uuid=${getUUID()}`);

	ws.onmessage = (event) => {
		const msg = JSON.parse(event.data);
		console.log(msg);

		if (msg.type === 'load-chat') {
			loadClientChat(msg.chat);
		} else if (msg.type === 'new-chat') {
			openNewChatForm().then((name) => {
				ws.send(JSON.stringify({
					type: 'new-chat',
					name
				}));
			});
		} else if (msg.type === 'start-chat') {
			console.log('start');
		}
	};

	ws.onopen = () => {
		console.log('Connected to server');
	};

	ws.onclose = () => {
		console.log('Disconnected from server');
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

async function loadClientChat (chat) {
	chatContent.innerHTML = '';

	const messages = chat.chat.sort((a, b) => new Date(a.time) - new Date(b.time));

	messages.forEach(message => {
		chatContent.innerHTML += getChatBox(message, message.fromClient === 1 ? chat.client : null);
	});
}

document.getElementById('direct-message-btn').addEventListener('click', () => {
	connectToChatServer();
});

document.getElementById('chat-close-btn').addEventListener('click', () => {
	disconnectFromChatServer();
});

connectToChatServer();
