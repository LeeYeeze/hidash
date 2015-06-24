/**
 * Created by yizeli on 6/4/15.
 */
function ACNode() {
    this.children = [];
    this.parent = null;
}
function ACAutomata(arrayOfStrings) {
    this.root = new ACNode();
    this.init(arrayOfStrings);
}

ACAutomata.prototype.init = function(arrayOfStrings) {
    for (var i = 0; i < arrayOfStrings.length; i++) {

    }
};

ACAutomata.prototype.search = function() {

}