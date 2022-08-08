

function isLeaf(value) {
    return !(typeof (value) === "object" || Array.isArray(value))
}

class TreeNode {
    constructor(key, value) {
        // leaves are childless members (string/number), and used as node Data
        this.leaves = [];
        this.children = [];

        if (key) {
            // construct a this as key node with the value node as child
            this.leaves.push(key);
            this.children.push(new TreeNode(null ,value));
        } else {
            if (isLeaf(value)) {
                this.leaves.push(value)
            }
            else if (Array.isArray(value)) {
                this._fromArray(value)
            } else {
                this._fromObject(value)
            }
        }
    }

    _fromObject(objectValue) {
        for (let [key, value] of Object.entries(objectValue)) {
            if (isLeaf(value)) {
                this.leaves.push({ key: value })
            } else {
                this.children.push(new TreeNode(key, value))
            }
        }
    }

    _fromArray(arrayValue) {
        this.children = arrayValue.map((value) => new TreeNode(null, value))
    }
}
