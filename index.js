const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const getDataFromApi = (searchTerm, callback) => {
	const query = {
	q: `${searchTerm} in:name`,
	part: 'snippet',
	key: 'AIzaSyDNqOlGbJFs95YPIab0ln69BmcmNrcWaY8', 
	per_page: 5
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
};
function generateVideoElement(item) {
    return `<div> 
        <h2 class="js-return-title"> ${item.snippet.title} </h2>
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}"> 
            <img src="${item.snippet.thumbnails.default.url}"></img>
        </a>
        <a href="https://www.youtube.com/channel/${item.snippet.channelId}">
        	<p>${item.snippet.channelTitle}</p>
    	</a>
    </div>`
}
function generateChannelElement(item) {
	return `<div>
	 <a href="https://www.youtube.com/watch?v=${item.snippet.channelTitle}"></a>
	</div>`;
}
function handleResponse(response) {
	console.log(response);
	let html = response.items.map(generateVideoElement).join('');
	$('.js-search-results').html(html);

}

const onReady = () => {
	$('form').submit((event) => {
		event.preventDefault();
		let input = $('#js-query').val();
		console.log(input);
	getDataFromApi(input, handleResponse);
	});
};



$(onReady);

