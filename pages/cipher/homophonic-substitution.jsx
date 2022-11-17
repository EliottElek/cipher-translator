import React, { useState, useEffect } from "react";
import Head from "next/head";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import Layout from "../../layout";
import { Tabs, Spinner } from "flowbite-react";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { ciphers, URL } from "../../data";
import {
  alphabet,
  generateKeyTable,
} from "../../utils/ciphers/homophonic-substitution";
import Mdx from "../../components/Mdx";
const Homophonic = () => {
  const [content, setContent] = useState("");
  const [word, setWord] = useState("word");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [page, setPage] = useState(null);
  const [key, setKey] = useState(null);
  const [mdContent, setMdContent] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/api/cipher/homophonic-substitution?word=${word}`
        );
        const cipher = ciphers.find(
          (cip) => cip.slug === "homophonic-substitution"
        );

        const mdxSource = await serialize(data.content, {
          mdxOptions: { rehypePlugins: [rehypeHighlight] },
        });
        setMdContent(mdxSource);
        setPage(cipher);
      } catch (e) {}
    };
    loadData();
  }, [setPage, setMdContent]);
  const handleGenerateNewKey = () => {
    setKey(generateKeyTable(word));
  };
  const handleEncrypt = async () => {
    if (content === "") return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${URL}/api/cipher/${page.slug}/encrypt/${content}?word=${word}`,
        { params: { key: key } }
      );
      setResult(data.result);
      console.log(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const handleDecrypt = async () => {
    if (content === "") return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${URL}/api/cipher/${page.slug}/decrypt/${content}?word=${word}`,
        { params: { key: key } }
      );
      setResult(data.result);
      console.log(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>{page?.name} cipher</title>
      </Head>
      <Layout title={page?.name + " cipher"} page={page}>
        <div className="border rounded-lg mb-8 dark:border-slate-700">
          <Tabs.Group aria-label="Tabs with underline" style="underline">
            <Tabs.Item active={true} title="Encrypt">
              <div className="flex gap-2 items-center w-full dark:text-slate-50 m-4 max-w-sm">
                {/* {!key && "No key yet. Generate one !"} */}
                <input
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  type="text"
                  placeholder="Your word..."
                  required={true}
                  className="block w-full rounded-md uppercase dark:bg-gray-700 dark:border-gray-700 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <Button onClick={handleGenerateNewKey}>Generate key</Button>
              </div>
              <div className="my-2 mb-6">{key && KeyTable(key)}</div>
              <div className="flex gap-2 w-full flex-col md:flex-row">
                <TextArea
                  setValue={setContent}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Plain text"
                />
                <div className="py-4 flex flex-col gap-2">
                  <Button
                    disabled={loading || content === ""}
                    onClick={handleEncrypt}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Spinner size="sm" light={true} />
                        </div>
                        Encrypting ...
                      </div>
                    ) : (
                      "Encrypt !"
                    )}
                  </Button>
                </div>
                <TextArea
                  setValue={setResult}
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="Cipher result"
                  disabled
                />
              </div>
            </Tabs.Item>
            <Tabs.Item title="Decrypt">
              <div className="flex gap-2 items-center w-full dark:text-slate-50 m-4 max-w-sm">
                {/* {!key && "No key yet. Generate one !"} */}
                <input
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  type="text"
                  placeholder="Your word..."
                  required={true}
                  className="block w-full rounded-md uppercase dark:bg-gray-700 dark:border-gray-700 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <Button onClick={handleGenerateNewKey}>Generate key</Button>
              </div>
              <div className="my-2 mb-6">{key && KeyTable(key)}</div>
              <div className="flex gap-2 w-full flex-col md:flex-row">
                <TextArea
                  setValue={setContent}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Plain text"
                />
                <div className="py-4 flex flex-col gap-2">
                  <Button
                    onClick={handleDecrypt}
                    disabled={content === "" && true}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Spinner size="sm" light={true} />
                        </div>
                        Decrypting ...
                      </div>
                    ) : (
                      "Decrypt !"
                    )}
                  </Button>
                </div>
                <TextArea
                  setValue={setResult}
                  value={result}
                  disabled
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="Cipher result"
                />
              </div>
            </Tabs.Item>
          </Tabs.Group>
        </div>
        <div className="dark:text-slate-200 mb-4">
          <Mdx mdContent={mdContent} />
        </div>
      </Layout>
    </>
  );
};

export default Homophonic;

const KeyTable = (key) => (
  <div className="max-w-screen overflow-x-auto">
    <table className="w-full">
      <thead className="border-b dark:text-slate-100 dark:border-gray-700">
        <th className="border-r dark:border-gray-600"></th>
        {alphabet.map((letter, i) => (
          <th key={i}>{letter}</th>
        ))}
      </thead>
      <tbody className="divide-y text-xs">
        {key.map((keyletter, i) => (
          <tr
            key={i}
            className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <td className="uppercase border-r p-2 text-center dark:border-gray-700 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white">
              {keyletter.letter}
            </td>
            {keyletter.children.map((child, i) => (
              <td
                key={i}
                className="whitespace-nowrap border-r p-2 text-center dark:border-gray-700 font-medium text-xs text-gray-900 dark:text-white"
              >
                {child}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
