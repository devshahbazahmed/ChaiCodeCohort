/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const votes = {};
  const registeredVoters = new Set();
  const votedVoters = new Set();
  const candidateIds = new Set();

  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    votes[c.id] = 0;
    candidateIds.add(c.id);
  }

  function registerVoter(voter) {
    if (
      !voter ||
      voter.id === undefined ||
      !voter.name ||
      typeof voter !== "object" ||
      typeof voter.age !== "number" ||
      voter.age < 18 ||
      registeredVoters.has(voter.id)
    )
      return false;

    registeredVoters.add(voter.id);
    return true;
  }

  function castVote(voterId, candidateId, onSuccess, onError) {
    if (!registeredVoters.has(voterId)) {
      return onError("Voter not registered");
    }

    if (!candidateIds.has(candidateId)) {
      return onError("Candidate does not exist");
    }

    if (votedVoters.has(voterId)) {
      return onError("Voter has already voted");
    }

    votes[candidateId]++;
    votedVoters.add(voterId);

    return onSuccess({ voterId, candidateId });
  }

  function getResults(sortFn) {
    const results = [];

    for (let i = 0; i < candidates.length; i++) {
      const c = candidates[i];

      results.push({
        id: c.id,
        name: c.name,
        party: c.party,
        votes: votes[c.id],
      });
    }

    if (sortFn) {
      results.sort(sortFn);
    } else {
      results.sort(function (a, b) {
        return b.votes - a.votes;
      });
    }

    return results;
  }

  function getWinner() {
    let maxVotes = -1;
    let winner = null;

    for (let i = 0; i < candidates.length; i++) {
      const c = candidates[i];
      const count = votes[c.id];

      if (count > maxVotes) {
        maxVotes = count;
        winner = c;
      }
    }

    if (maxVotes === 0) return null;

    return winner;
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner,
  };
}

export function createVoteValidator(rules) {
  return function (voter) {
    const validObj = {
      valid: false,
      reason: "",
    };

    const hasAllkeys = rules.requiredFields.every((key) =>
      voter.hasOwnProperty(key),
    );

    if (voter.age < rules.minAge) {
      validObj.valid = false;
      validObj.reason = "Age is less than 18";
    } else if (!hasAllkeys) {
      validObj.valid = false;
      validObj.reason = "Fields are missiing";
    } else {
      validObj.valid = true;
    }

    return validObj;
  };
}

export function countVotesInRegions(regionTree) {
  if (!regionTree || typeof regionTree.votes !== "number") return 0;

  let totalVotes = regionTree.votes;

  if (Array.isArray(regionTree.subRegions)) {
    for (let i = 0; i < regionTree.subRegions.length; i++) {
      totalVotes += countVotesInRegions(regionTree.subRegions[i]);
    }
  }
  return totalVotes;
}

export function tallyPure(currentTally, candidateId) {
  const newTally = {};

  for (let key in currentTally) {
    newTally[key] = currentTally[key];
  }

  if (newTally[candidateId] !== undefined) {
    newTally[candidateId] = newTally[candidateId] + 1;
  } else {
    newTally[candidateId] = 1;
  }

  return newTally;
}
