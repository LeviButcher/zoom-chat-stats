import { parseCommentLine } from "./CommentParser";

it("parseCommentLine works with expected formatted string", () => {
  const testString = "09:31:09	 From  Kryzstof Kudlak : good morning";
  const commentRecord = parseCommentLine(testString);
  expect(commentRecord).toMatchObject({
    name: "Kryzstof Kudlak",
    comment: "good morning",
  });
});

it("parseCommentLine fails with incorrect formatted string", () => {
  const testString = "askldjfl;asjdf";
  const commentRecord = parseCommentLine(testString);
  expect(commentRecord).toBeNull();
});
