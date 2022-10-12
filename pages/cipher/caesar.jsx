import React, { useState, useEffect } from "react";
import Head from "next/head";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import Layout from "../../layout";
import { Tabs, Spinner, TextInput, Label, Badge } from "flowbite-react";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { ciphers, URL } from "../../data";
const Caesar = () => {
  const [content, setContent] = useState("");
  const [keySize, setKeySize] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [page, setPage] = useState(null);
  const [mdContent, setMdContent] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/cipher/caesar`);
        const cipher = ciphers.find((cip) => cip.slug === "caesar");

        const mdxSource = await serialize(data.content);
        setMdContent(mdxSource);
        setPage(cipher);
      } catch (e) {}
    };
    loadData();
  }, [setPage, setMdContent]);
  const handleEncrypt = async () => {
    if (content === "") return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${URL}/api/cipher/${page.slug}/encrypt/${content}?key=${keySize}`
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
        `${URL}/api/cipher/${page.slug}/decrypt/${content}?key=${keySize}`
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
          <Tabs.Item active={true} title="Encrypt" className="text-red-700">
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
                <Button
                  disabled={content === ""}
                  onClick={() => {
                    setContent("");
                    setResult("");
                  }}
                >
                  Clear
                </Button>
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
                <Button
                  disabled={content === ""}
                  onClick={() => {
                    setContent("");
                    setResult("");
                  }}
                >
                  Clear
                </Button>
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

export default Caesar;
