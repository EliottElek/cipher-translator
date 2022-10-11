import React, { useState } from "react";
import Head from "next/head";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import Layout from "../../layout";
import { Tabs, Spinner, TextInput, Label, Badge } from "flowbite-react";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { paths, ciphers } from "../../data";
const Caesar = ({ page, mdContent }) => {
  const [content, setContent] = useState("");
  const [keySize, setKeySize] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleEncrypt = async () => {
    if (content === "") return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/cipher/${page.slug}/encrypt/${content}?key=${keySize}`
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
          <MDXRemote {...mdContent} />
        </div>
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active={true} title="Encrypt">
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

export default Caesar;

export async function getStaticProps({ params }) {
  const cipher = ciphers.find((cip) => cip.slug === params.cipher);
  const { data } = await axios.get(
    `http://localhost:3000/api/cipher/${params.cipher}`
  );
  if (!cipher || !data) {
    return { notFound: true };
  }
  const mdxSource = await serialize(data.content);
  return { props: { page: cipher, mdContent: mdxSource } };
}
export async function getStaticPaths() {
  return {
    paths: paths,
    fallback: false, // false or 'blocking'
  };
}
