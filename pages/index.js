import Products from './components/Products';

const HomePage = (props) => {

  return (
    <>
      <Products items={props.items.data} />
    </>
  )
}

const encodePass = btoa(process.env.INIT_USER + ':' + process.env.INIT_PASS);

export async function getServerSideProps(context) {


  var raw = {
    "uuid": "cool-workstation",
    "uuidOS": "Android"
  };

  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(raw),
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encodePass
    }
  };


  const res = await fetch("https://dev-mrp.insby.tech/api/init/app", requestOptions);
  const { data } = await res.json();
  const tokenId = data.token;


  const res2 = await fetch("https://dev-mrp.insby.tech/api/session/restaurant/menu",
    {
      headers: new Headers({
        'Authorization': 'Bearer ' + tokenId
      }),
    }
  )
  const data2 = await res2.json();

  return {
    props: {
      items: data2
    }
  }
}

export default HomePage;
