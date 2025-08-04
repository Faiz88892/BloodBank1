document.addEventListener("DOMContentLoaded",async ()=>{
	let totalDonors=document.getElementById("total_donors");
	let bloodRequest=document.getElementById("total_requests");
	let stockAvailable=document.getElementById("stock_available");
	
	try{
		let resp =await fetch("http://localhost:2025/bloodsync/AdminDashboardServlet");
			let data =await resp.json();
			if(data.status==='failed'){
				throw new error("exception occured:"+data.message);
			}
			
			
			totalDonors.innerText=data.totalDonars;
			bloodRequest.innerText=data.totalRequests;
			stockAvailable.innerText=data.totalStock;
	}catch(error){
		console.log(error);
	}
});
