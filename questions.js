const questions = [
    {
        id: 1,
        text: "Cuando nos vimos por primera vez?",
        type: "text",
        options: [
            { text: "26 de mayo 2024", correct: true },
            { text: "01 de junio 2024", correct: false },
            { text: "10 de mayo 2024", correct: false },
            { text: "12 de julio 2024", correct: false }
        ]
    },
    {
        id: 2,
        text: "Que merendamos ese dia?",
        type: "text",
        options: [
            { text: "Bizcochuelo", correct: false },
            { text: "Alfajor", correct: true },
            { text: "Cafe", correct: false },
            { text: "No merendamos", correct: false }
        ]
    },
    {
        id: 3,
        text: "En que imagen se encuentra Kalita?",
        type: "image",
        options: [
            { image: "images/kala-2.jpeg", correct: false },
            { image: "images/kala-1.jpeg", correct: true },
            { image: "images/kala-3.jpeg", correct: false },
            { image: "images/kala-4.jpeg", correct: false }
        ]
    },
    {
        id: 4,
        text: "Donde fue esta foto?",
        type: "text_with_image",
        image: "images/foto-viaje-1.jpeg",
        options: [
            { text: "Subida al Frey", correct: true },
            { text: "Subida al Laguna Negra", correct: false },
            { text: "VGB", correct: false },
            { text: "Subida a la Playita", correct: false }
        ]
    },
    {
        id: 5,
        text: "Como se llamo mi primer personaje en DnD?",
        type: "text",
        options: [
            { text: "Kalan Virel", correct: false },
            { text: "Mathius", correct: false },
            { text: "Theus", correct: true },
            { text: "Rocky Bolson", correct: false }
        ]
    },
    {
        id: 6,
        text: "Donde fue esta foto?",
        type: "text_with_image",
        image: "images/foto-viaje-2.jpeg",
        options: [
            { text: "Areco", correct: true },
            { text: "Bolson", correct: false },
            { text: "VGB", correct: false },
            { text: "San Martin de los Andes", correct: false }
        ]
    },
    {
        id: 7,
        text: "Cual es mi pelicula favorita?",
        type: "text",
        options: [
            { text: "La isla siniestra", correct: false },
            { text: "Bastardos sin gloria", correct: false },
            { text: "El silencio de los inocentes", correct: true },
            { text: "Scary movie 3", correct: false }
        ]
    },
    {
        id: 8,
        text: "Donde fue esta foto?",
        type: "text_with_image",
        image: "images/foto-viaje-3.jpeg",
        options: [
            { text: "MDQ", correct: true },
            { text: "VGB", correct: false },
            { text: "Bariloche", correct: false },
            { text: "Areco", correct: false }
        ]
    },
    {
        id: 9,
        text: "De donde fue nuestra primer hamburguesa?",
        type: "text",
        options: [
            { text: "Felix Burger", correct: false },
            { text: "Mc Donalds", correct: false },
            { text: "Burga Point", correct: true },
            { text: "Burger King", correct: false }
        ]
    },
    {
        id: 10,
        text: "Cual fue mi primer trabajo?",
        type: "text",
        options: [
            { text: "Repositor", correct: true },
            { text: "Mc Donalds", correct: false },
            { text: "Programador en unreal", correct: false },
            { text: "Profesor particular", correct: false }
        ]
    },
];
