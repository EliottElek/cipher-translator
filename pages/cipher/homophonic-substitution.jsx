import React, { useState, useEffect } from "react";
import Head from "next/head";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import Layout from "../../layout";
import { Tabs, Spinner, TextInput, Label } from "flowbite-react";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { ciphers } from "../../data";
import {
  alphabet,
  generateKeyTable,
} from "../../utils/ciphers/homophonic-substitution";
const Homophonic = () => {
  const [content, setContent] = useState("");
  const [keySize, setKeySize] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [page, setPage] = useState(null);
  const [key, setKey] = useState(null);
  const [mdContent, setMdContent] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/cipher/homophonic-substitution`
        );
        const cipher = ciphers.find(
          (cip) => cip.slug === "homophonic-substitution"
        );

        const mdxSource = await serialize(data.content);
        setMdContent(mdxSource);
        setPage(cipher);
      } catch (e) {}
    };
    loadData();
  }, [setPage, setMdContent]);
  const handleGenerateNewKey = () => {
    setKey(generateKeyTable());
  };
  const handleEncrypt = async () => {
    if (content === "") return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/cipher/${page.slug}/encrypt/${content}`,
        { params: { key: key } }
      );
      setResult(data.result);
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
        `/api/cipher/${page.slug}/decrypt/${content}?key=${keySize}`
      );
      setResult(data.result);
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
        <div className="dark:text-slate-200 mb-4">
          {mdContent && <MDXRemote {...mdContent} />}
        </div>

        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active={true} title="Encrypt">
            <div className="flex gap-2 items-center w-full dark:text-slate-50 m-4 max-w-xs">
              {!key && "No key yet. Generate one !"}
              <Button onClick={handleGenerateNewKey}>Generate new key</Button>
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
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Key size (0-25)" />
                </div>
                <TextInput
                  value={keySize}
                  onChange={(e) => setKeySize(e.target.value)}
                  min={0}
                  max={25}
                  id="small"
                  type="number"
                  sizing="sm"
                />
              </div>
              <TextArea
                setValue={setResult}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Cipher result"
              />
            </div>
          </Tabs.Item>
          <Tabs.Item title="Decrypt">
            <div className="flex gap-2 items-center w-full dark:text-slate-50 m-4 max-w-xs">
              {!key && "No key yet. Generate one !"}
              <Button onClick={handleGenerateNewKey}>Generate new key</Button>
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
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Key size (0-25)" />
                </div>
                <TextInput
                  value={keySize}
                  onChange={(e) => setKeySize(e.target.value)}
                  min={0}
                  max={25}
                  id="small"
                  type="number"
                  sizing="sm"
                />
              </div>
              <TextArea
                setValue={setResult}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Cipher result"
              />
            </div>
          </Tabs.Item>
        </Tabs.Group>
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
        {alphabet.map((letter) => (
          <th key={letter}>{letter}</th>
        ))}
      </thead>
      <tbody className="divide-y text-xs">
        {key.map((keyletter) => (
          <tr
            key={keyletter}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td className="uppercase border-r p-2 text-center dark:border-gray-700 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white">
              {keyletter.letter}
            </td>
            {keyletter.children.map((child) => (
              <td
                key={child}
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
