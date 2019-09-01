import React, {useState, useEffect} from "react";
import Loading from "./Loading"

const HackerNews = () => {

	const [news, setNews] = useState([]);
	const [searchQuery, setSearchQuery] = useState('react');
	const [apiUrl, setApiUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');
	const [loading, setLoading] = useState(false)

	const getNews = () => {
		setLoading(true);
		fetch(apiUrl)
			.then(result => result.json())
			.then(data => {setNews(data.hits);setLoading(false);})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		getNews();
	}, [apiUrl]);

	const getQuery = e => {
		setSearchQuery(e.target.value);
	}

	const searchTopic = e => {
		e.preventDefault();
		setApiUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
	}

	const searchForm = () => {
		return(<form onSubmit={searchTopic}>
			<div className="input-group">
				<input type="text" className="form-control" value={searchQuery} onChange={getQuery} placeholder="Type Here to Search" />
				<div className="input-group-append">
			 		<button className="btn btn-success btn-block">Search</button>
				</div>
			</div>
		</form>);
	}

	const viewNews = () => <ul>{news.map((n,i) => (<li key={i}>{n.title}</li>))}</ul>;

	return (
		<div>
			<div className="alert alert-primary p-2 mb-0 mt-3"><h4>News</h4></div>
			<div>
				{searchForm()}
			</div>
			<div className="card">
				<div className="card-body">
					{!loading ? viewNews() : <Loading />}
				</div>
			</div>
		</div>
	);

}

export default HackerNews;