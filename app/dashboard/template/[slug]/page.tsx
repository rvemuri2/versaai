"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import template from "@/utils/template";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { runAi } from "@/actions/ai";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";

export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category: string;
  aiPrompt: string;
  form: Form[];
}
export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

export default function Page({ params }: { slug: string }) {
  const [query, setQuery] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const editorRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (content) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(content);
    }
  }, [content]);
  const t = template.find((item) => item.slug === params.slug) as Template;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAi(t.aiPrompt + query);
      setContent(data);
    } catch (e) {
      setContent("Error Occurred, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
      <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
        <div className="flex flex-col gap-3">
          <Image src={t.icon} alt={t.name} width={50} height={50} />
          <h2 className="font-medium text-lg">{t.name}</h2>
          <p className="text-gray-500">{t.desc}</p>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          {t.form.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div className="my-2 flex flex-col gap-2 mb-7">
              <label className="font-bold pb-5">{item.label}</label>
              {item.field === "input" ? (
                <Input
                  name={item.name}
                  required={item.required}
                  onChange={(e) => setQuery(e.target.value)}
                />
              ) : (
                <Textarea
                  name={item.name}
                  required={item.required}
                  onChange={(e) => setQuery(e.target.value)}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full py-6" disabled={loading}>
            {loading ? (
              <Loader2Icon className="animate-spin mr-2" />
            ) : (
              "Generate Content"
            )}
          </Button>
        </form>
      </div>
      <div className="col-span-2">
        <Editor
          ref={editorRef}
          initialValue="Generated content will appear here"
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          onChange={() =>
            setContent(editorRef.current.getInstance().getMarkdown())
          }
        />
      </div>
    </div>
  );
}
