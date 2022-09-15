
import { db } from "./index.js";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, query, limit } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";


const titleVal = document.getElementById("txtTitle");
const authorVal = document.getElementById("txtAuthor");
const yearVal = document.getElementById("txtYear");
const hdnVal = document.getElementById("hdnId");

GetBooksCollection()

async function GetBooksCollection() {
    let colref = query(collection(db, 'Books'), limit(2));

    let snapshot =  await getDocs(colref);

    let books = []
    snapshot.forEach(doc => {
        books.push({ id: doc.id, ...doc.data() })
    })

    BindBooksTable(books)

}

function BindBooksTable(books) {
    const body = document.querySelector("tbody");
    if(body != null) body.remove();
    const table = document.getElementById('tblBooks');
    const tbody = document.createElement('tbody');
    table.append(tbody);

    books.forEach(book => {
        let row = `<tr>
        <td><a href="#" class="edit-row">${book.id}</a></td>
        <td>${book.Name}</td>
        <td>${book.Year}</td>
        <td>${book.Author}</td>
        <td><a href="#" class="delete-row" id="${book.id}">Delete</a></td>
        </tr>`

        tbody.insertAdjacentHTML('beforeend', row)
    })

    const editRow = document.querySelectorAll(".edit-row");

    editRow.forEach(row => {
        row.addEventListener('click', async () => {
            const docRef = doc(db, "Books", row.textContent);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                titleVal.value = docSnap.data().Name;
                yearVal.value = docSnap.data().Year;
                authorVal.value = docSnap.data().Author;
                hdnId.value = docSnap.id;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    })

    const deleteRow = document.querySelectorAll(".delete-row");

    deleteRow.forEach(row => {
        row.addEventListener('click', async () => {
            const docRef = doc(db, "Books", row.id);
            await deleteDoc(docRef).then(x => GetBooksCollection());
        })
    })
}


const button = document.querySelector("button")

button.addEventListener('click', async () => {

    if(hdnVal.value == "") {
        let colref = collection(db, 'Books');
        let newId = await addDoc(colref, {
            Name: titleVal.value,
            Author: authorVal.value,
            Year: yearVal.value,
        })
        console.log(newId.id);
    }
else {
    let docRef = doc(db, 'Books', hdnVal.value);
        await updateDoc(docRef, {
            Name: titleVal.value,
            Author: authorVal.value,
            Year: yearVal.value,
        })
}
    
    
    GetBooksCollection()
})

let colref = collection(db, 'Books');

let snapShot = await getDocs(colref);

let books = [];

snapShot.forEach(async doc => {
   books.push({...doc.data(), id: doc.id})
})

books.forEach(async book => {
    let subColRef = collection(db, 'Books', book.id, 'Publishers');
    let snap = await getDocs(subColRef);

    let publishers = [];

    snap.forEach(async publisher => {
        publishers.push( {id: publisher.id, ...publisher.data() })
    })

    book.Publisher = publishers
})

console.log(books)