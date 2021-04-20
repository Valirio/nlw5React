

export default function Home() {

  return (
    <>
    index
    </>
  );
}

export async function getServerSideProps(){
  const res = await fetch('http://localhost:3333/episodes')
  const data = await res.json();

  return{
    props:{
      episodes:data,
    },
    revalidate: 60*60*8,
  }
}
