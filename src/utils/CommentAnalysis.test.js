import { commentGroupCount } from "./CommentAnalysis";

it("Good input gives correct result", () => {
  const input = [
    { name: "Abeel", comment: "Something" },
    { name: "abeel", comment: "asjdfasf" },
    { name: "biden", comment: "asjdfasf" },
  ];
  const res = commentGroupCount(input);
  expect(res).toMatchObject([
    { group: "A-F", count: 3 },
    { group: "G-M", count: 0 },
    { group: "N-S", count: 0 },
    { group: "T-Z", count: 0 },
  ]);
});
