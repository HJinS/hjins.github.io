import { visit } from "unist-util-visit";
import type { Root } from "mdast";

export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node: any) => {
      if (node.lang !== "mermaid") return;

      // Convert code block to HTML div
      const htmlNode = {
        type: "html" as const,
        value: `<div class="mermaid">${node.value}</div>`,
      };

      // Replace the node
      const index = tree.children.indexOf(node);
      if (index !== -1) {
        tree.children[index] = htmlNode;
      }
    });
  };
}
