import * as Router from 'koa-router';
import * as compose from 'koa-compose';
import config from '../../config/index';
import { addHero, getAll, getById, updateHero, deleteHero } from '../controllers/hero';

const router = new Router({
  prefix: `${config.api.baseURL}/heroes`,
});

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', addHero);

router.put('/:id', updateHero);

router.delete('/:id', deleteHero);

const routes = router.routes();
export default compose([routes]);
