const contacts = [
    {
        phonenumber: 34057,
        name: 'Michele',
        avatar: './img/avatar_1.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },
    {   
        phonenumber: 31240,
        name: 'Fabio',
        avatar: './img/avatar_2.jpg',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        phonenumber: 33446,
        name: 'Samuele',
        avatar: './img/avatar_3.jpg',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        phonenumber: 30013,
        name: 'Alessandro B.',
        avatar: './img/avatar_4.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        phonenumber: 32179,
        name: 'Alessandro L.',
        avatar: './img/avatar_5.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        phonenumber: 36912,
        name: 'Claudia',
        avatar: './img/avatar_6.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        phonenumber: 31296,
        name: 'Federico',
        avatar: './img/avatar_7.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        phonenumber: 35241,
        name: 'Davide',
        avatar: './img/avatar_8.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
]

const {createApp} = Vue;
const {DateTime} = luxon;

createApp({
    data(){
        return{
            contactsList: contacts,
            chatId: 0,
            messageStatusParameterCondition: "received",
            messageStatus: ["received-message","sent-message"],
            messageTarget: "",
        }
    },
    methods: {
        showTimeFunc(dataTarget, timeType){
            const timeTarget = dataTarget;

            if(timeType === "hours"){
                const splitTime = timeTarget.split(" ");
                const splitTimeAry = splitTime[1].split(":");
                return `${splitTimeAry[0]}:${splitTimeAry[1]}`;
            }
            else if(timeType === "date"){
                const splitTime = timeTarget.split(" ");
                return splitTime[0];
            }
            else {
                return timeTarget;
            }
        },
        openChatFunc(event){
            let elementTarget = event.target.closest("li");
            let dataIdTarget = elementTarget.dataset.id;
            let phonenumberList = this.contactsList.map(item => item.phonenumber);
            let phonenumberIndex = phonenumberList.findIndex(item => item == dataIdTarget);
            this.chatId = phonenumberIndex;
        },
        sentMessageFunc(){
            if(this.messageTarget.trim() === ""){return};
            const now = DateTime.now().c;
            const currDate = `${now.day}/${now.month}/${now.year} ${now.hour}:${now.minute}:${now.second}`;
            this.contactsList[this.chatId].messages.push(
                {
                    date: currDate,
                    message: this.messageTarget,
                    status: 'sent'
                }
            )
            this.messageTarget = "";
            setTimeout(() => {
                this.contactsList[this.chatId].messages.push(
                    {
                        date: currDate,
                        message: "Ok",
                        status: 'received'
                    }
                )
            }, 1000)
            console.log(currDate);
        }
    }
}).mount("#app")