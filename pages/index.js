import Head from "next/head";
import Layout from "../layout";
import { Card } from "flowbite-react";
import { Badge } from "flowbite-react";
import { ciphers } from "../data";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Cypher translator</title>
        <meta name="description" content="Cypher translator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title="Home">
        <div className="grid z-0">
          {ciphers.map((card) => (
            <Link href={card.available ? card.href : "#"}>
              <Card href={card.available && card.href} horizontal={true}>
                <div className="relative h-full w-full z-0">
                  <h5
                    className={[
                      "text-2xl font-bold tracking-tight text-gray-800 dark:text-white flex items-center justify-between",
                      !card.available && "text-gray-400 dark:text-gray-500",
                    ].join(" ")}
                  >
                    {card.name}
                    <div className="absolute -right-4 -top-4">
                      <Badge color={card.difficultyColor}>
                        {card.difficulty}
                      </Badge>
                    </div>
                  </h5>
                  <p
                    className={[
                      "font-normal text-gray-700 dark:text-gray-400",
                      !card.available && "text-gray-400",
                    ].join(" ")}
                  >
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                  {!card.available && (
                    <div className="absolute -right-4 -bottom-4">
                      <Badge color="pink">Not available</Badge>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
}
