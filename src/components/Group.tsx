/*
{
    group: "cp2 test",
    content: [
      { name: "codeforces", web: "https://codeforces.com/" },
      { name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
*/
interface shortcut{
    name:string;
    web:string;
}

interface Group{
    group:string;
    content: shortcut[];
}
interface GroupInput{
    group:Group;
}
function Group({group}:GroupInput) {
  return (
    <div></div>
  )
}

export default Group