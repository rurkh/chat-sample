import {  combineEpics } from 'redux-observable';
import authEpic from './auth.epics';
import usersEpic from './users.epic';
import appEpic from './app.epic';
import chatEpic from './chatroom.epic';

export default combineEpics(appEpic, authEpic, usersEpic, chatEpic);
