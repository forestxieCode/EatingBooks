// 25 合并排序好的两个链表
// 数据 
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
// 方式一

function ListNode(val) {
    this.val = val;
    this.next = null;
}
var mergeTwoLists = function(l1, l2) {
    let head = new ListNode(1)
    let ret = head
    while(l1!=null && l2!==null){
        if(l1.val < l2.val){
            head.next = l1
            l1 = l1.next
        } else {
              head.next = l2
              l2= l2.next
        } 
        head = head.next
    }
    l1 ? head.next = l1 : head.next = l2
    return ret.next
};

// 方式二
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) return l2
    if(l2 === null )return l1
    if(l1.val <= l2.val){
        l1.next = mergeTwoLists(l1.next,l2)
        return l1
    }
    l2.next = mergeTwoLists(l1,l2.next)
    return l2
}


