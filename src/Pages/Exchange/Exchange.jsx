import { useEffect,useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import UserVac from "../../Components/UserVac/UserVac";
import Footer from "../../Components/Footer/Footer";

const Exchange = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [order, setOrder] = useState({ isLoading: true, data: [] });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const navigate = useNavigate();


  const loadMoreOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const nextPage = page + 1;
      const newLimit = limit + 6;

      const res = await axios.get(`/order?page=${nextPage}&limit=${newLimit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newOrders = res.data.data.orders;
      Promise.all(newOrders.map((order) => getUserById(order.user)))
        .then((users) => {
          const updatedOrders = newOrders.map((order, index) => ({
            ...order,
            user: users[index],
          }));

          setOrder((prevState) => ({
            isLoading: false,
            data: { count: prevState.data.count + newOrders.length, updatedOrders: [...prevState.data.updatedOrders, ...updatedOrders] },
          }));
          setPage(nextPage);
          setLimit(newLimit);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("You must register first");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const orders = res.data.data.orders;
        const count = res.data.data.totalOrder
        Promise.all(orders.map((order) => getUserById(order.user)))
          .then((users) => {
            const updatedOrders = orders.map((order, index) => ({
              ...order,
              user: users[index],
            }));
            setOrder({ isLoading: false, data: {count, updatedOrders }});
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function getUserById(userId) {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`/search/work?title=${searchValue}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  

  return (
    <div>
      <div className="container  md:mx-auto">
        <Navbar />
        <div className="font-sans flex flex-col items-center justify-center h-[83vh] gap-20">
          <h1>
            Ищите и находите подходящую работу среди <br />{" "}
            <span className="text-green-500">10,000+</span> проектов и покажите
            на что Вы способны!
          </h1>
          <form className="flex items-center">
            <input
              className=" ps-3 h-9 w-80 rounded-l-2xl bg-[#F2F0FE]"
              type="text"
              id="search"
              name="search"
              placeholder="Какую работу ищете?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearch} className="w-[100px] bg-orange-400 h-9 rounded-r-2xl text-white">
              Найти
            </button>
          </form>
          <div className=" w-[ 70%] grid grid-cols-4 grid-rows-3 gap-4  h-36">
          {searchResults && searchResults.data && searchResults.data.map((result, index) =>(
      <div
        key={index}
        className="border-1 text-[#656084] hover:border-green-400 hover:text-green-400 min-w-46 rounded text-center no-underline bg-[#f0ffff]"
      >
        {result}
      </div>
    ))}
            <Link className="border-1 text-[#656084] hover:border-green-400 hover:text-green-400 min-w-46 rounded text-center no-underline  bg-[#f0ffff]">
              Тексты и переводы{" "}
            </Link>
            <Link className="border-1 hover:border-green-400 hover:text-green-400 min-w-46 rounded text-center no-underline text-[#656084] bg-[#f0ffff]">
              Разработка{" "}
            </Link>
            <Link className="border-1 hover:border-green-400 hover:text-green-500 min-w-36 rounded text-center no-underline text-[#656084] bg-[#f0ffff]">
              Дизайн
            </Link>
            <Link className="border-1 hover:border-green-400 hover:text-green-400 min-w-56 rounded text-center no-underline text-[#656084] bg-[#f0ffff]">
              Аудио, видео монтаж{" "}
            </Link>
            <Link className="border-1 hover:border-green-400 hover:text-green-400 min-w-56 rounded text-center no-underline text-[#656084] bg-[#f0ffff]">
              SEO и оптимизация
            </Link>
            <Link className="border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-[#656084] bg-[#f0ffff]">
              Бизнес и жизнь
            </Link>
            <Link className="border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-[#656084] bg-[#f0ffff]">
              Соцсети и реклама
            </Link>
            <Link className="border-1 hover:border-green-400 hover:text-green-400 rounded text-center no-underline text-[#656084] bg-[#f0ffff]">
              Все подкатегории
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
          <h4>Ниже все заказы по <span className="text-green-500">дизайну</span></h4>
          <i className="fa-solid fa-chevron-down text-green-500 text-5xl"></i>
          </div>
        </div>
        <div className="mt-32">
            <div className="flex justify-between">
                <h5>{order.data.count} проектов по дизайну</h5>
                <div className="flex gap-8">
                    <button className=" bg-[#F2F0FE] rounded-2xl px-2 text-[#656084]">Минимальная цена</button>
                    -
                    <button className="mr-12 rounded-2xl border-1 text-[#656084] hover:border-green-500 px-2 bg-[#F2F0FE]">Максимальная цена</button>
                    <select className="rounded-2xl border-1 text-[#656084]  px-4 hover:border-green-500 bg-[#F2F0FE]">
                        <option>По возрастанию цены</option>
                        <option>Сниженная цена</option>
                    </select>
                </div>
            </div>
            <div className=" grid grid-cols-1 gap-4 mt-10">
            {order.isLoading ? (
            <p>Loading...</p>
          ) : order.data.updatedOrders.length > 0 ? (
            order.data.updatedOrders.map((item, index) => (
              <UserVac
                key={index}
                title={item.title}
                image={item.user?.data?.image}
                price={item.price}
                releaseDate={item.releaseDate}
                username={item.user?.data?.name}
              />
            ))
          ) : (
            <p>No data available.</p>
          )}
            </div>
        </div>
        <div className=" flex items-center justify-center mt-10 ">
        {order.data.count > limit && (
            <button
              onClick={loadMoreOrders}
              className="h-[35px] w-[150px] rounded-2xl border-1 border-green-500 text-green-500 transition-all hover:transition-all hover:bg-green-500 hover:text-white"
            >
              Загрузить еще
            </button>
          )}
      </div>
      </div>
      
      <div className="">
      <Footer/>
      </div>
    </div>
  );
};

export default Exchange;
