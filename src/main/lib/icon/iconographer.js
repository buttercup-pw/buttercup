import { Iconographer } from '@buttercup/iconographer';
import IconFileStorage from './IconFileStorage';
import electron from 'electron';
import path from 'path';

const app = electron.app || electron.remote.app;
const iconPath = path.join(app.getPath('userData'), 'icons');

const storage = new IconFileStorage(iconPath);
const iconographer = new Iconographer();
iconographer.storageInterface = storage;

export default iconographer;
