import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MarkdownFile {
  slug: string;
  title: string;
  date?: string;
  content: string;
}

function getContentDirectory(locale: string) {
  return path.join(process.cwd(), "content", locale);
}

export function getAllMarkdownSlugs(locale: string) {
  const dir = getContentDirectory(locale);
  try {
    const fileNames = fs.readdirSync(dir);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (e) {
    return [];
  }
}

export function getMarkdownBySlug(
  slug: string,
  locale: string,
): MarkdownFile | null {
  try {
    const dir = getContentDirectory(locale);
    const fullPath = path.join(dir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug.replace(/-/g, " "),
      date: data.date || "",
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllMarkdownFiles(locale: string): MarkdownFile[] {
  const slugs = getAllMarkdownSlugs(locale);
  const files = slugs
    .map((slug) => getMarkdownBySlug(slug, locale))
    .filter((file): file is MarkdownFile => file !== null);

  // Sort files by date if available
  return files.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}
