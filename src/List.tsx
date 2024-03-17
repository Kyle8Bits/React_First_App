function List(props:any) {
  const language = [
    { id: 1, name: "Java", complex: 50 },
    { id: 2, name: "Python", complex: 10 },
    { id: 3, name: "JavaScript", complex: 60 },
    { id: 4, name: "TypeScript", complex: 90 },
    { id: 5, name: "C++", complex: 100 },
    { id: 6, name: "C#", complex: 100 },
  ];

    language.sort((a,b) => b.complex - a.complex);

    const lowComplex = language.filter((language) => language.complex < 120);

    const listLanguage = lowComplex.map((lowComplex) => (
        <li key={lowComplex.id}>{lowComplex.name} : {lowComplex.complex}</li>
    ));

  return <ol className="list-lang">{listLanguage}</ol>;

}

export default List;
