import Realm from "realm";
import { RecordSchema } from './src/Schema/Record';

const realm = Realm.open({ schema: [RecordSchema], schemaVersion: 4 });

export default realm;