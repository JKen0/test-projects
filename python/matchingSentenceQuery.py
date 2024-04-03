
# Online Python - IDE, Editor, Compiler, Interpreter

def matching(queryWords, sentenceWords):
    for qWord in queryWords:
        found = False;
        for sWord in  sentenceWords:
            if(qWord == sWord):
                found = True;
                break;
        
        if(not found): 
            return False;
    return True;
            

def function(sentences, queries):
    allMatches = [];
    for i, iele in enumerate(queries):
        queryMatches = [];
        queryWords = iele.split(' ');
        
        for j, jele in enumerate(sentences):
            sentenceWords = jele.split(' ');
        
            isMatching = matching(queryWords, sentenceWords)
            
            if(isMatching):
                queryMatches.append(j);
        
        if(len(queryMatches) == 0):
            queryMatches.append(-1)
        
        allMatches.append(queryMatches)
    
    return allMatches;
    
    
sentences = ['jim likes mary', 'kate likes tom', 'tom does not like jim'];
queries = ['jim tom', 'likes'];
answer = [[2], [0,1]];

print(function(sentences, queries) == answer);