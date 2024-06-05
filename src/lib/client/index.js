const getTeams = async () => {
  const query = `select * from teams`;
  const resp = await window.catalyst.ZCatalystQL.executeQuery(query);
  let data = resp?.content || [];
  return data.map((team) => team.Teams);
};

const getTeamById = async (id) => {
    const query = `select * from teams where TeamID = ${id}`;
    const resp = await window.catalyst.ZCatalystQL.executeQuery(query);
    let data = resp?.content || [];
    return data[0]?.Teams;
}

const getTeamPlayers = async (id) => {
    const query = `select * from players inner join teams on players.Team = teams.ROWID where teams.TeamId = '${id}'`;
    const resp = await window.catalyst.ZCatalystQL.executeQuery(query);
    let data = resp?.content || [];
    return data?.map((player) => player.Players);
}

const getPlayers = async () => {
    const resp = await fetch('/server/cds_cricfest_function/players', { headers: { 'Content-Type': 'application/json' } });
    const data = await resp.json();
    return data?.data || [];
}

const getMatches = async () => {
  const query = `select * from matches`;
  const resp = await window.catalyst.ZCatalystQL.executeQuery(query);
  let data = resp?.content || [];
  return data.map((match) => match.Matches);
}


const getStumpTeams = async (teamId) => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const reqBody = {"method": "GET"};
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const tournaments = await getStumpTournaments();

    const teams = await Promise.all(tournaments.map(async (tournament) => {
      const resp = await fetch(`${baseUrl}/prod/tournaments/id/${tournament.trk}/teams`, { method:"POST", headers, body: JSON.stringify(reqBody) });
      const data = await resp.json();
      let teams = data?.result || [];
      return teams.map((team) => ({...team, tournament: tournament}));
    }));
    return teams.flat();
  } catch (error) {
      throw new Error("Unable to fetch teams");
  }

}

const getStumpTournaments = async () => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const clubId = process.env.REACT_APP_CLUB_ID;

  const reqBody = {
    "method": "GET",
    "data": {
        "ck": clubId,
        "limit": 3
    }
}
  const headers = {
    "Content-Type": "application/json"
  }

  try {
     const resp = await fetch(`${baseUrl}/prod/clubs/id/${clubId}/tournaments`, { method:"POST", headers, body: JSON.stringify(reqBody) });
     const data = await resp.json();
     const tournaments = data?.result || [];
     return tournaments;
  } catch (error) {
      throw new Error("Unable to fetch tournaments");
  }
}

const getStumpTeamMembers = async (teamId) => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const reqBody = {"method": "GET"};
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const resp = await fetch(`${baseUrl}/prod/teams/id/${teamId}/teamplayers`, { method:"POST", headers, body: JSON.stringify(reqBody) });
    const data = await resp.json();
    return data?.result || [];
  } catch (error) {
      throw new Error("Unable to fetch team members");
  }
}

const getStumpTeamStats = async (teamId) => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const reqBody = {"method": "GET", "data": {"mfmt": 0, "blty": 0, "yr": 0}};
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const resp = await fetch(`${baseUrl}/prod/teams/id/${teamId}/teamstats/overview`, { method:"POST", headers, body: JSON.stringify(reqBody) });
    const data = await resp.json();
    console.log(data?.result)
    return data?.result || [];
  } catch (error) {
      throw new Error("Unable to fetch team stats");
  }
}

const getStumpTeamOverview = async (teamId) => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const userId = process.env.REACT_APP_STUMP_USER_ID;

  const reqBody = {"method": "GET", "data": {"uk": userId}}
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const resp = await fetch(`${baseUrl}/prod/teams/id/${teamId}/overview`, { method:"POST", headers, body: JSON.stringify(reqBody) });
    const data = await resp.json();
    return data?.result || [];
  } catch (error) {
      throw new Error("Unable to fetch team overview");
  }

}

const getStumpTeamPointsTable = async () => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const tournaments = await getStumpTournaments();

    const teams = await Promise.all(tournaments.map(async (tournament) => {
      const reqBody = {
        "method": "GET",
        "data": {
            "trk": tournament?.trk
        }
      }
      const resp =  await fetch(`${baseUrl}/prod/tournaments/id/${tournament?.trk}/pointstable`, { method:"POST", headers, body: JSON.stringify(reqBody) });
      const data = await resp.json();
      let teams = data?.result || [];
      return teams.map((team) => ({...team, tournament: tournament}));
    }));

    return teams.flat();
  } catch (error) {
      throw new Error("Unable to fetch team points table");
  }
}

const getStumpTournamentMatches = async (tournamentId) => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const userId =process.env.REACT_APP_STUMP_USER_ID;

  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const tournaments = await getStumpTournaments();

    const teams = await Promise.all(tournaments.map(async (tournament) => {
      const reqBody = {
        "method": "GET",
        "data": {
            "uk": userId,
            "trk": tournament?.trk,
            "limit": 30,
            "lastTs": null,
            "mlt": null,
            "mty": null,
            "mst": null
        }
      }
      const resp =  await fetch(`${baseUrl}/prod/tournaments/id/${tournament?.trk}/matches`, { method:"POST", headers, body: JSON.stringify(reqBody) });
      const data = await resp.json();
      let teams = data?.result || [];
      return teams.map((team) => ({...team, tournament: tournament}));
    }));
    return teams.flat();
  } catch (error) {
      throw new Error("Unable to fetch tournament matches");
  }

}

const getStumpCurrentMatchStats = async () => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const userId = process.env.REACT_APP_STUMP_USER_ID;
  const clubId = process.env.REACT_APP_CLUB_ID;

  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const reqBody = {
      "method": "GET",
      "data": {
          "uk": userId,
          "ck": clubId,
          "limit": 10,
          "lastTs": null,
          "mlt": 1,
          "mty": null,
          "mst": null
      }
  }
    const resp =  await fetch(`${baseUrl}/prod/clubs/id/${clubId}/matches`, { method:"POST", headers, body: JSON.stringify(reqBody) });
    const data = await resp.json();
    return data?.result || [];
  } catch (error) {
      throw new Error("Unable to fetch current match stats");
  }
}

const getStumpHomeStats = async (tournamentId) => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const userId = process.env.REACT_APP_STUMP_USER_ID;

  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const reqBody = {"method": "GET", "data": {"trk": tournamentId,"uk": userId}
  }
    const resp =  await fetch(`${baseUrl}/prod/tournaments/id/${tournamentId}/home`, { method:"POST", headers, body: JSON.stringify(reqBody) });
    const data = await resp.json();
    return data?.result || [];
  } catch (error) {
      throw new Error("Unable to fetch home stats");
  }
}

const getStumpTournamentStats = async (tournamentId) => {
  const baseUrl = process.env.REACT_APP_API_DOMAIN;
  const userId = process.env.REACT_APP_STUMP_USER_ID;

  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const reqBody = {"method": "GET", "data": {"trk": tournamentId,"uk": userId}
  }
    const resp =  await fetch(`${baseUrl}/prod/tournaments/id/${tournamentId}/stats/overview`, { method:"POST", headers, body: JSON.stringify(reqBody) });
    const data = await resp.json();
    return data?.result || [];
  } catch (error) {
      throw new Error("Unable to fetch home stats");
  }
}
export { getTeams, getTeamById, getTeamPlayers, getPlayers, getMatches, getStumpTeams, getStumpTournaments, getStumpTeamMembers, getStumpTeamStats, getStumpTeamOverview, getStumpTeamPointsTable, getStumpTournamentMatches, getStumpCurrentMatchStats, getStumpHomeStats, getStumpTournamentStats};
