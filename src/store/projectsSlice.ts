import {createSlice} from "@reduxjs/toolkit";

interface project {
    projectId: string | null;
    plotId: string | null;
    power: number | null;
    stageYear: number | null;
    loadType: string | null
}

interface projects {
    projects: project[];
    currSelectedProj: project;
}

const intialState: projects = {
    projects:[],
    currSelectedProj: {
        projectId: null,
        plotId: null,
        power: null,
        stageYear: null,
        loadType: null,
    }
}

const projectSlice = createSlice(
    {
        name: 'projectSlice',
        initialState: intialState,
        reducers: {
            addProject: (state, action: any) => {
                // add in logic next time
            },
        }
    }
)