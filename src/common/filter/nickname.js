// 输出用户昵称
export default function (nickname, defaultNickName) {
    defaultNickName = defaultNickName || '佚名';
    nickname = nickname || defaultNickName;
    return nickname;
}
