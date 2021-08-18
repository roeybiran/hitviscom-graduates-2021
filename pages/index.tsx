import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import ProjectCard from "@/components/ProjectCard";
import Center from "@/components/Center";
import Grid from "@/components/Grid";
import Nav from "@/components/Header";
import fetchAirtableData from "@/lib/fetchAirtableData";
import makeFeaturedImage from "@/lib/makeFeaturedImage";
import strings from "@/lib/strings";
import { useState, useMemo } from "react";
import Footer from "@/components/Footer";
import styled from "styled-components";
import Cover from "@/components/Cover";

const SearchModeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--s2);
  max-width: var(--measure);
  justify-content: center;
  margin-inline-start: auto;
  margin-inline-end: auto;
`;

const Results = (props: { searchMode: boolean; children: JSX.Element[] }) => {
  if (props.searchMode) {
    return props.children.length > 0 ? (
      <SearchModeWrapper>{props.children}</SearchModeWrapper>
    ) : (
      <Center intristic>
        <p
          style={{
            fontSize: "var(--s3)",
            color: "var(--stdblue)",
          }}
        >
          ¯\_(ツ)_/¯
        </p>
      </Center>
    );
  } else {
    return <Grid>{props.children}</Grid>;
  }
};

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const allProjects = useMemo(
    () =>
      props.projects.map((p) => ({
        project: p,
        card: (
          <ProjectCard
            key={p.id}
            slug={p.slug}
            featuredImage={p.featuredImage}
            imageAlt={p.imageAlt}
            projectName={p.projectName}
            student={{
              firstName: p.student.firstName,
              lastName: p.student.lastName,
            }}
            room={p.room}
            floor={p.floor}
          />
        ),
      })),
    [props.projects]
  );

  const [currentCards, setCurrentCards] = useState<JSX.Element[]>(
    allProjects.map((p) => p.card)
  );
  const [inSearchMode, setInSearchMode] = useState<boolean>(false);

  const handleChange = (s: string) => {
    const q = s.toLowerCase().replace(/\s/g, "");
    if (!q) {
      setInSearchMode(false);
      setCurrentCards(allProjects.map((p) => p.card));
    } else {
      setInSearchMode(true);
    }
    const filtered = allProjects
      .filter(({ project: p }) => {
        const haystacks = [
          p.student.firstName,
          p.student.lastName,
          p.student.firstName + p.student.lastName,
          p.projectName,
        ]
          .map((s) => s.toLowerCase())
          .filter((s) => s.startsWith(q));
        return haystacks.length > 0;
      })
      .map((p) => p.card);
    setCurrentCards(filtered);
  };

  return (
    <>
      <Head>
        <title>{strings.he.heads.home.title}</title>
        <meta name="description" content={strings.he.heads.home.description} />
      </Head>
      <Nav onInput={handleChange} />
      <Center max="none" gutters="var(--s1)">
        <header className="sr-only">
          <h1>{strings.he.suffix}</h1>
        </header>
        <main>
          <Results searchMode={inSearchMode}>{currentCards}</Results>
        </main>
      </Center>
      <Footer
        list={allProjects.map((p) => ({
          first: p.project.student.firstName,
          last: p.project.student.lastName,
          slug: p.project.slug,
        }))}
      />
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const data = await fetchAirtableData();
  const featuredImages = await Promise.all(
    data.map((p) => makeFeaturedImage(p.featuredImage))
  );
  const projects = featuredImages
    .map((img, idx) => {
      const proj = data[idx];
      return {
        id: proj.id,
        slug: proj.slug,
        featuredImage: img,
        imageAlt: proj.imagesAltText,
        projectName: proj.projectNameHe,
        student: {
          firstName: proj.firstNameHe,
          lastName: proj.lastNameHe,
        },
        room: proj.room ?? null,
        floor: proj.floor ?? null,
      };
    })
    .sort((p1, p2) => {
      if (!p1 || !p2) return 0;
      if (p1.student.lastName < p2.student.lastName) return -1;
      if (p1.student.lastName > p2.student.lastName) return 1;
      if (p1.student.firstName < p2.student.firstName) return -1;
      if (p1.student.firstName > p2.student.firstName) return 1;
      if (p1.id < p2.id) return -1;
      if (p1.id > p2.id) return 1;
      return 0;
    });

  return {
    props: {
      projects,
    },
  };
};
