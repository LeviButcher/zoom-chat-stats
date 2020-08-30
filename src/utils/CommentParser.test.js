import { parseCommentLine } from "./CommentParser";

it("parseCommentLine works with expected formatted string", () => {
  const testString = "00:13:05\tEthan Weaver:\tYes!";
  const commentRecord = parseCommentLine(testString);
  expect(commentRecord).toMatchObject({
    name: "Ethan Weaver",
    comment: "Yes!",
  });
});

it("parseCommentLine fails with incorrect formatted string", () => {
  const testString = "askldjfl;asjdf";
  const commentRecord = parseCommentLine(testString);
  expect(commentRecord).toBeNull();
});
