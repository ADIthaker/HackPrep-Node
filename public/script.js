document.addEventListener('DOMContentLoaded', function() {

	document.querySelectorAll(".form-check-input").forEach(item => {
		item.addEventListener('click', function(event) {
			event.preventDefault()
			if(this.checked !== true){
				this.checked = true;
			} else {
				this.checked = false;
			}
		})
	});

	document.getElementById("add-task").addEventListener('click', function(event) {
		var task = document.getElementById("new-task").value;
		console.log(task);
		if (task.trim() !== "") {
			let tasks = document.querySelectorAll('.form-check-input')
			fetch("http://localhost:5000/add-item", {
				headers: {'Content-Type': 'application/json'},
				method:"POST",
				body: JSON.stringify({task: task, index: tasks.length})
			}).then(res => res.json()).then(data => console.log("added"))
		}
	});

	let removeButtons = document.querySelectorAll('.remove-item')
	for( var idx = 0; idx < removeButtons.length; idx++){
		let item = removeButtons[idx];
		item.addEventListener('click', function(event) {
			this.parentElement.remove();
			fetch("http://localhost:5000/remove-item", {
				headers: {'Content-Type': 'application/json'},
				method: "POST",
				body: JSON.stringify({index: this.previousElementSibling.children[0].id})
			}).then(res => res.json()).then(data => console.log("removed"))
		})
	}

}, false);
