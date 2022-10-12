import React, { useEffect, useState } from "react";
import Head from "next/head";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import Layout from "../../layout";
import { Tabs, Spinner, Alert } from "flowbite-react";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { ciphers, URL } from "../../data";
import {
  generateRandomAlphabet,
  keyCheck,
} from "../../utils/ciphers/mono-alphabetic";
const MonoAlphabetic = () => {
  const [content, setContent] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [page, setPage] = useState(null);
  const [mdContent, setMdContent] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/api/cipher/mono-alphabetic-substitution`
        );
        const cipher = ciphers.find(
          (cip) => cip.slug === "mono-alphabetic-substitution"
        );

        const mdxSource = await serialize(data.content);
        setMdContent(mdxSource);
        setPage(cipher);
      } catch (e) {}
    };
    loadData();
  }, [setPage, setMdContent]);

  const handleGenerateNewKey = () => {
    setKey(generateRandomAlphabet());
  };
  const handleEncrypt = async () => {
    const check = keyCheck(key);
    if (!check.success) {
      setOpenAlert(true);
      setAlertMessage(check.message);
      return;
    }
    if (content === "") return;
    setLoading(true);
    setOpenAlert(false);
    setAlertMessage(null);

    try {
      const { data } = await axios.get(
        `${URL}/api/cipher/${page.slug}/encrypt/${content}?key=${key}`
      );
      setResult(data.result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const handleDecrypt = async () => {
    // Checking if the key is correct
    const check = keyCheck(key);
    if (!check.success) {
      setOpenAlert(true);
      setAlertMessage(check.message);
      return;
    }
    if (content === "") return;
    setLoading(true);
    setOpenAlert(false);
    setAlertMessage(null);
    try {
      const { data } = await axios.get(
        `${URL}/api/cipher/${page.slug}/decrypt/${content}?key=${key}`
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
            <div className="max-w-xl">
              {openAlert && (
                <Alert color="failure">
                  <span>
                    <span className="font-medium">Key doesnt seem right !</span>{" "}
                    {alertMessage}
                  </span>
                </Alert>
              )}
            </div>
            <div className="flex gap-2 items-center w-full dark:text-slate-50 m-4 sm:max-w-2xl">
              {!key && "No key yet. Generate one !"}
              {key && (
                <div className="flex gap-2 items-center w-full">
                  <span className="flex items-center">key</span>
                  <input
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    type="text"
                    placeholder="Your key..."
                    required={true}
                    className="block w-full rounded-md uppercase border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}
              <Button onClick={handleGenerateNewKey}>Generate new key</Button>
            </div>
            <div className="flex gap-2 w-full flex-col md:flex-row">
              <TextArea
                setValue={setContent}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Plain text"
              />
              <div className="py-4 flex flex-col gap-2">
                <Button
                  disabled={content === "" || (!key && true)}
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
            <div className="max-w-xl">
              {openAlert && (
                <Alert color="failure">
                  <span>
                    <span className="font-medium">Key doesnt seem right !</span>{" "}
                    {alertMessage}
                  </span>
                </Alert>
              )}
            </div>
            <div className="flex gap-2 items-center w-full dark:text-slate-50 m-4 sm:max-w-2xl">
              {!key && "No key yet. Generate one !"}
              {key && (
                <div className="flex gap-2 items-center w-full">
                  <span className="flex items-center">key</span>
                  <input
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    type="text"
                    placeholder="Your key..."
                    required={true}
                    className="block w-full rounded-md uppercase border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}
              <Button onClick={handleGenerateNewKey}>Generate new key</Button>
            </div>
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
                  disabled={content === "" || (!key && true)}
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

export default MonoAlphabetic;
