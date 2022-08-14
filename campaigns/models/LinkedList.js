class Node {
    constructor(element){
        this.contact = element;
        this.next = null;
    }
}


export default class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(element){
        let node = new Node(element);

        if(this.head == null){
            this.head = node;
            this.tail = node;
        }
        else{
            this.tail.next = node;
            this.tail = this.tail.next;
        }
        this.size++;
    }

    length(){
        return this.size;
    }

    printItems(){
        let current = this.head;
        while(current){
            console.log(current.contact);
            current = current.next;
        }
    }

    pop_front(){
        let node = this.head;
        this.head = node.next;
        this.size--;
        return node;
    }
}
