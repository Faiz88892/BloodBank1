document.addEventListener("DOMContentLoaded",async()=>{
	let donorTable=document.getElementById("donorTableBody");
	try{
		let response=await fetch("fetch://localhost:2025/BloodSync/ManageDonorServlet?id="+id,{
			method:"DELETE";
		});
		let data=await response.json();
		if(data.status==='failed'){
			throw new Error(data.message);
		}
		data.forEach((donor)=>{
			
			let action="Not Applicable";
			
			if(donor.bloodUnit===0){
				action=`<td><button class="approve" id="${donor.donorid}">Edit Unit</button></td>
			            <td><button class="reject" id="${donor.donorid}">delete</button></td>`;
			}else{
				action=`<td>${donor.bloodUnit}</td>
				         <td>Not Applicable</td>`;
			}
			
			
			let row=`<tr><td>${donor.id}</td>
			         <td>${donor.name}</td>
					 <tr><td>${donor.bloodType}</td>
					 <tr><td>${donor.city}</td>
					 <tr><td>${donor.contact}</td>
					 ${action}
					 </tr>`;
					 
			donorTable.innerHTML+=row;
		});
		let allButtons=document.querySelector("button");
		allButtons.forEach( (button)=>{
			button.addEventListener("click",async (e)=>{
				if(e.target.innerText==='Delete'){
					let ans= await deleteDonor(e.target.id);
					if(ans){
						alert("donor deleted succesfully...");
						location.reload;
					}else{
					alert("donor deleted failed")	;	
				}
				
				}else{
					let units = prompt("enter units between 1 to 15");
					if(isNaN(units)){
						alert("please input a valid units");
						return;
					}
					units = Number(units);
					isValidUnits(units);
					if(isValidUnits(units)){
						await updateDonor(e.target.id,units);
					}else{
						alert("please enter units between 1 to 15");
						return;
					}
				}
			});
		});
		
	}catch(error){
		console.log(error);
	}
	
	
});

function deleteDonor(id){
	try{
	let response=await fetch("http://localhost:2025/BloodSync/ManageDonorServlet?id="+id,{
		method:"DELETE"
	});
	let data =await response.json();
	if(data.status==='error'){
		throw new Error(data.message);
	}else if(data.status==='success'){
		return true;
	}else{
		return false;
	}
}catch(error){
	console.log(error);
}

}

function isValidUnits(units){
	if(units>0 && units<=15){
		return true;
	}
	return false;
	
}

async function updateDonor(id,units){
	let response= await fetch("fetch://localhost:2025/BloodSync/ManageDonorServlet?id="+id,{
		method:"PUT"
	});
	let data=await response.json();
	if(data.status==='success'){
		alert(data.message);
		location.reload();
	}else{
		alert(data.status);
	}
	
}

