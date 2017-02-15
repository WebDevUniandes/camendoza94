//Original from http://yonaba.github.io/2012/08/14/List-your-GitHub-projects-using-JavaScript-and-jQuery.md.html

jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback);
};
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);    
     
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name !== (username.toLowerCase()+'.github.com')) {
                list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                if (this.description === null){
                    this.description = "There's no description for this repo";
                }
                list.append('<dd>' + this.description +'</dd>');
            }
        });      
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};

