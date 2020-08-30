interface CommentRecord {
  name: string;
  comment: string;
}

export function parseCommentLine(rawString: string): CommentRecord | null {
  const nameRegex = /(?<=\t)(.*)(?=:\t)/g;
  const name = rawString.match(nameRegex)?.join();
  const commentRegex = /(?<=:\t)(.*)/g;
  const comment = rawString.match(commentRegex)?.join();
  console.log(name);
  console.log(comment);

  return name && comment ? { name, comment } : null;
}
