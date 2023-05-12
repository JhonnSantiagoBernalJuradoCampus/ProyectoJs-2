const headers = new Headers({"Content-Type": "application/json"});
const puerto = 4000;
export default{
    async post(data){
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }
        return await( await fetch(`http://localhost:${puerto}/reclutas`, config)).json()
    },
    async myForm(){
        let form = document.querySelector("form")
        form.addEventListener("submit", (e)=>{
            let data = Object.fromEntries(new FormData(e.target))
            this.post(data)
        })
    },
    async get(){
        const config = {
            method: "GET",
            headers: headers,
        }
        return await( await fetch(`http://localhost:${puerto}/reclutas`, config)).json()
    },
    async show(){
        let data = await this.get();
        let table = document.querySelector("tbody");
        let plantilla = "";
        data.forEach((val,id) => {
            plantilla += `
            <tr class="p-1">
                <td>${val.nombre}</td>
                <td>${val.edad}</td>
                <td>${val.telefono}</td>
                <td>${val.email}</td>
                <td>${val.direccion}</td>
                <td>${val.fecha_nacimiento}</td>
                <td>${val.numero_documento}</td>
                <td>${val.fecha_ingreso_programa}</td>
                <td><button type="button" class="delete btn btn-light w-100 text-light" name="delete" id=${val.id}>Delete</button></td>
                <td><button type="button" class="edit ${val.id} btn w-100 text-light btn-light" name="edit" id="${val.id}">Edit</button></td>
        </tr>`
        });
        table.insertAdjacentHTML("beforeend", plantilla)
    },
    async delete(id){
        const config = {
            method: "DELETE",
            headers: headers,
        }
        return await( await fetch(`http://localhost:${puerto}/reclutas/${id}`, config)).json()
    },
    async deleteReclutas(){
        await this.show()
        let btn = document.querySelectorAll(`[name="delete"]`)
        btn.forEach((val,id)=>{
            val.addEventListener("click", (e)=>{
                this.delete(val.id)
            })
        })
    },
    async put(put_content, id){
        const config = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(put_content)
        }
        return await( await(fetch(`http://localhost:${puerto}/reclutas/${id}`, config))).json()
    }
}