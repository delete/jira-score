const GOOD_MORNING = /.*bom.*dia.*/i
const GOOD_AFTERNOON = /good afternoon/
const HELLO = /.*(eai|olar|oi|colé|coe).*/i
const HELP = /.*(help|ajuda|socorro|socorre).*/i
const MY_SELF = /.*(jira|malcriado).*/
const POINTS = /pontos|ponto|score/i
const ISSUES = /issues|issue|tarefas/i
const LOGIN = /^(entrar|entar|entra|logar|login|vai) .*(dsn|qld).cir$/i
const GOAL = /^meta/i
const TOP10 = /top10|topten/i

module.exports = {
    GOOD_MORNING,
    GOOD_AFTERNOON,
    HELLO,
    HELP,
    MY_SELF,
    POINTS,
    ISSUES,
    LOGIN,
    GOAL,
    TOP10
}