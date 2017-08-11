const DONT_GET_IT = [
    'Não entendi, fala pra fora.',
    'Tira o ovo pra falar.'
]

const GOOD_MORNING = [
    'Só se for pra você!',
    'Bom dia pra quem vai bater a meta de hoje!'
]

const WELCOME = [
    'Ai sim!',
    'Uhul, agora você também é um malcriado!'
]

const USER_FOUND = [
    'Opa, opa! Esse usuário já existe meu chapa!',
    'Já tem gente usando seu nome e vendo seus pontos. HA HA',
    'Cê já ta logado nem.'
]

const USER_NEEDED = [
    'Ou! Preciso do seu login antes!',
    'Cara crachá, cara crachá. Cade o login.'
]

const MY_SELF = [
    'Eu!',
    'Meu nome!',
    'Diga...'
]

const HELLO = [
    ( user ) => `Eai <@${user}>!`,
    ( user ) => `Colé <@${user}>!`
]

const HELP = [
    (() => [
        '*entrar USERNAME* para fazer login',
        '*pontos* para pegar seus pontos',
        '*issues* para listar as quantidades.', 
        '*top10* ranking dos colaboradores.', 
    ].join('\n'))()
]

const LOADING = [
    'To pensando, pera ae!!',
    'Já vai...',
    'Ta com pressa? Passa por cima!',
    'Cê é chato, hein?',
    'Já pensou em deixar isso anotado?'
]

const ERROR_BOT = [
    'Tô a fim de responder, não! Tente novamente...',
    'Me obrigue...'
]

const ERROR_JIRA = [
    'Maẽẽẽẽẽ, foi o Jira!'
]

// SCORE MESSAGES
const ONE_THIRD = [
    'Trabalha não?! É bom começar.',
    'Que que ta pegando? Vamos lá, vocẽ consegue!'
]

const LESS_HALF = [
    'Anda logo com isso ae, ta quase na metade!',
    'Já está quase na metade. BORA TIMEEE!!!'
]

const MORE_HALF = [
    'Tu ta o bichão memo, em?!',
    'Mais um pouco e sai do chão! Ta voando...',
    'Mais um pouco e breja vai ta garantida!'
]

const COMPLETED = [
    'Agora que chegou na meta, vamos dobrar ela.',
    'A meta já acabou mas o trabalho ainda não.',
    'Agora já pode ir ajudar oszamiguinhos.',
    'A breja ta garantida!',
    'Agora pode pagar o sorvetinho pros coleguinhas,'
]

module.exports = {
    DONT_GET_IT,
    ERROR_BOT,
    ERROR_JIRA,
    GOOD_MORNING,
    USER_FOUND,
    WELCOME,
    USER_NEEDED,
    ONE_THIRD,
    LESS_HALF,
    MORE_HALF,
    MY_SELF,
    HELLO,
    HELP,
    LOADING,
    COMPLETED
}