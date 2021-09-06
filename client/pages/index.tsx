import Error from "next/error";
import type { NextPage } from "next";
import Layout from "../components/Layout";

import Quiz from "../components/Quiz";
import { getQuiz } from "../services/Quiz.service";
import ErrorBoundary from "../components/ErrorBoundary";

const Home: NextPage = ({ errorCode, quiz }: any) => {
  const pageMeta = {
    title: "Personality Test",
  };
  return (
    <Layout pageMeta={pageMeta}>
      <section className="intro">
        <div className="background-image"></div>
        <h1>Are you an introvert or an extrovert?</h1>
        <a
          className="btn"
          onClick={() =>
            document.getElementById("start-quiz")?.scrollIntoView()
          }
        >
          Start the test
        </a>
      </section>

      <section className="quiz" id="start-quiz">
        <h3 className="title">Personality test</h3>
        {errorCode ? (
          <Error statusCode={errorCode} />
        ) : (
          <ErrorBoundary>
            <Quiz quiz={quiz} />
          </ErrorBoundary>
        )}
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const data = await getQuiz("personality-test");
    return {
      props: { erroCode: null, quiz: data },
    };
  } catch (err: any) {
    return {
      props: { errorCode: err.code },
    };
  }
}
export default Home;
