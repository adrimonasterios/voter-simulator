$(document).ready(()=>{

let voters = [];
let democratCandidates = [];
let republicanCandidates = [];
let independentCandidates = [];



class Person {
  constructor(name){
    this.name = name
  }
};

class Voter extends Person {
  constructor (name, ideology){
    super(name);
    this.ideology=ideology
  }
};

class Candidate extends Person{
  constructor(name, party){
    super(name);
    this.party = party;
    this.votes = 0;
  }
}

function voterCreator(name, ideology){
  let voter = new Voter(name, ideology);
  voters.push(voter)
  return voter
}

function candidateCreator(name, party){
  let candidate = new Candidate(name, party);
  if(candidate.party == "Democrat"){
    democratCandidates.push(candidate)
  }else if(candidate.party == "Republican"){
    republicanCandidates.push(candidate)
  }else if(candidate.party == "Independent"){
    independentCandidates.push(candidate)
  }else{
    console.log("Not a valid Party")
  }
  return candidate
}

// let voter1 = voterCreator("Adrian", "conservative");
// let voter2 = voterCreator("Adriano", "republican");
// console.log(voters);
// console.log(voters[0].name)


$('#voter-form .btn-primary').on('click', ()=>{
    let voterName = $('#voter-name').val();
    let voterIdeology = $('#voter-ideology').val();
    let newVoter = voterCreator(voterName, voterIdeology);
    $('#voter-list .list-group').append(`<li class="list-group-item">${newVoter.name}, ${newVoter.ideology}</li>`)
})

$('#candidate-form .btn-primary').on('click', ()=>{
    let candidateName = $('#candidate-name').val();
    let candidateParty = $('#candidate-party').val();
    let newCandidate = candidateCreator(candidateName, candidateParty);
    $('#candidate-list .list-group').append(`<li class="list-group-item">${newCandidate.name}, ${newCandidate.party}</li>`)
})

$('.randomize-voter').on('click', ()=>{
  let ideologyArr = ['Conservative', 'Liberal', 'Neutral'];

  for(let i=0; i<1000; i++){
  let randomIdeology = ideologyArr[Math.floor(Math.random()*3)];
  let fakeFirstName = faker.name.firstName();
  let fakeLastName = faker.name.lastName();
  let fakeName = `${fakeFirstName} ${fakeLastName}`
  let newFakeVoter = voterCreator(fakeName, randomIdeology);
  $('#voter-list .list-group').append(`<li class="list-group-item">${newFakeVoter.name}, ${newFakeVoter.ideology}</li>`)
    }
})

$('.randomize-candidate').on('click', ()=>{
  let partyArr = ['Democrat', 'Independent', 'Republican'];

  for(let i=0; i<12; i++){
  let randomParty = partyArr[Math.floor(Math.random()*3)];
  let fakeFirstName = faker.name.firstName();
  let fakeLastName = faker.name.lastName();
  let fakeName = `${fakeFirstName} ${fakeLastName}`
  let newFakeCandidate = candidateCreator(fakeName, randomParty);
  $('#candidate-list .list-group').append(`<li class="list-group-item">${newFakeCandidate.name}, ${newFakeCandidate.party}</li>`)
  }
})

$('#vote-btn-div').on('click', ()=>{
  anounceTheWinner()
})

function vote(){
  let democratVotes=0;
  let independentVotes=0;
  let republicanVotes=0;
  let votesArr=[];

//   for(let i=0; i<voters.length; i++){
//     if(voters[i].ideology == 'Liberal'){
//       democratVotes += 0.6;
//       independentVotes += 0.2;
//       republicanVotes += 0.2;
//     }else if(voters[i].ideology == 'Neutral'){
//       democratVotes += 0.25;
//       independentVotes += 0.5;
//       republicanVotes += 0.25;
//     }else if(voters[i].ideology == 'Conservative'){
//       democratVotes += 0.2;
//       independentVotes += 0.2;
//       republicanVotes += 0.6;
//     }else{
//       console.log('invalid vote')
//     }
//   }
//
//     votesArr.push(democratVotes);
//     votesArr.push(independentVotes);
//     votesArr.push(republicanVotes);
//
//     return votesArr
//
// }


for(let i=0; i<voters.length; i++){
  if (!democratCandidates.length && !independentCandidates.length){
    console.log(`There is no Party Competition!!!!`)
  }else if(!democratCandidates.length && !republicanCandidates.length){
    console.log(`There is no Party Competition!!!!`)
  }else if(!republicanCandidates.length && !independentCandidates.length){
    console.log(`There is no Party Competition!!!!`)
  }else if(democratCandidates.length == 0){

    switch(voters[i].ideology){
      case 'Liberal':
        independentVotes += 0.5;
        republicanVotes += 0.5;
        break;
      case 'Neutral':
        independentVotes += 0.67;
        republicanVotes += 0.33;
        break;
      case 'Conservative':
        independentVotes += 0.25;
        republicanVotes += 0.75;
        break;
      default:
        console.log('invalid ideology');
    }

  }else if(independentCandidates.length == 0){

    switch(voters[i].ideology){
      case 'Liberal':
        democratVotes += 0.75;
        republicanVotes += 0.25;
        break;
      case 'Neutral':
        democratVotes += 0.5;
        republicanVotes += 0.5;
        break;
      case 'Conservative':
        democratVotes += 0.25;
        republicanVotes += 0.75;
        break;
      default:
        console.log('invalid ideology');
    }

  }else if(republicanCandidates.length == 0){

    switch(voters[i].ideology){
      case 'Liberal':
        democratVotes += 0.75;
        independentVotes += 0.25;
        break;
      case 'Neutral':
        democratVotes += 0.33;
        independentVotes += 0.67;
        break;
      case 'Conservative':
        democratVotes += 0.5;
        independentVotes += 0.55;
        break;
      default:
        console.log('invalid ideology');
    }

  }else if(democratCandidates.length && independentCandidates.length && republicanCandidates.length){

    switch (voters[i].ideology){
      case 'Liberal':
        democratVotes += 0.6;
        independentVotes += 0.2;
        republicanVotes += 0.2;
        break;
      case 'Neutral':
        democratVotes += 0.25;
        independentVotes += 0.5;
        republicanVotes += 0.25;
        break;
      case 'Conservative':
        democratVotes += 0.2;
        independentVotes += 0.2;
        republicanVotes += 0.6;
        break;
      default:
        console.log('invalid ideology')
    }

  }else{
    console.log(`Something went wrong!`)
  }

}

  votesArr.push(democratVotes);
  votesArr.push(independentVotes);
  votesArr.push(republicanVotes);

  return votesArr

}

function resultsCreator(party, name, votes){
  return{
    party,
    name,
    votes
  }
}


function pickACandidate(){
  let votesArr = vote();
  let noCandidates = {name: "No candidates", party: "None"}


  if(!democratCandidates.length){
    democratCandidates.push(noCandidates)
  };
  if(!independentCandidates.length){
    independentCandidates.push(noCandidates)
  };
  if(!republicanCandidates.length){
    republicanCandidates.push(noCandidates)
  };

  let randomDemocrat = democratCandidates[Math.floor(Math.random()*democratCandidates.length)].name;
  let randomIndependent = independentCandidates[Math.floor(Math.random()*independentCandidates.length)].name;
  let randomRepublican = republicanCandidates[Math.floor(Math.random()*republicanCandidates.length)].name;
  let finalResults = [];

  let democrats = resultsCreator('Democrat', `${randomDemocrat}`, votesArr[0]);
  let independents = resultsCreator('Independent', `${randomIndependent}`, votesArr[1]);
  let republicans = resultsCreator('Republican', `${randomRepublican}`, votesArr[2]);

  finalResults.push(democrats);
  finalResults.push(independents);
  finalResults.push(republicans);

  return finalResults;
}


function anounceTheWinner(){
  let finalResults = pickACandidate();
  let totalVotes = finalResults[0].votes + finalResults[1].votes + finalResults[2].votes;
  if(finalResults[0].votes > finalResults[1].votes && finalResults[0].votes > finalResults[2].votes){
    alert(`The Democrat candidate ${finalResults[0].name} won with the ${parseFloat(finalResults[0].votes/totalVotes).toFixed(2)*100}% of the votes!`)
  }else if(finalResults[1].votes > finalResults[0].votes && finalResults[1].votes > finalResults[2].votes){
    alert(`The Independent candidate ${finalResults[1].name} won with the ${parseFloat(finalResults[1].votes/totalVotes).toFixed(2)*100}% of the votes!`)
  }else if(finalResults[2].votes > finalResults[1].votes && finalResults[2].votes > finalResults[0].votes){
    alert(`The Republican candidate ${finalResults[2].name} won with the ${parseFloat(finalResults[2].votes/totalVotes).toFixed(2)*100}% of the votes!`)
  }else{
    console.log("No Winnerss!")
  }
}




























})
