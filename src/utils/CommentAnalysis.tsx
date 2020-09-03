import { CommentRecord } from "./CommentParser";

const nameMatchesLetterGroup = (letterGroup: string) => (name: string) => {
  const res = name.match(
    new RegExp(
      `(^[${letterGroup.toUpperCase()}])|(^[${letterGroup.toLowerCase()}])`
    )
  );
  return res !== null ? res.length : false;
};

export function commentGroupCount(comments: Array<CommentRecord>) {
  const letterGroups = ["A-F", "G-M", "N-S", "T-Z"];

  return letterGroups.map((x) => ({
    group: x,
    count: comments.map((c) => c.name).filter(nameMatchesLetterGroup(x)).length,
  }));
}
