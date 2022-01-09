const Tarea = require("./tarea");
require("colors");

class Tareas {
	_listado = {};

	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});
		return listado;
	}

	constructor() {
		this._listado = {};
	}

	borrarTarea(id = "") {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	crearTarea(desc = "") {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	listadoCompleto() {
		console.log();
		this.listadoArr.map((tarea, index) => {
			const indice = `${index + 1}`.green;
			const completado = tarea.completadoEn !== null ? "Completado".brightGreen : "Pendiente".brightRed;
			console.log(`${indice}. ${tarea.desc} :: ${completado}`);
		});
	}
	listarPendientesCompletadas(completadas = true) {
		console.log();
		let contador = 0;

		this.listadoArr.map((tarea) => {
			const { completadoEn } = tarea;
			const completado = tarea.completadoEn !== null ? "Completado".brightGreen : "Pendiente".brightRed;

			if (completadas === true && completadoEn !== null) {
				contador += 1;
				console.log(`${(contador + ".").green} ${tarea.desc} :: ${completadoEn.green}`);
			} else if (completadas === false && completadoEn === null) {
				contador += 1;
				console.log(`${(contador + ".").green} ${tarea.desc} :: ${completado}`);
			}
		});
	}
	toggleCompletadas = (ids = []) => {
		ids.forEach((id) => {
			const tarea = this._listado[id];
			if (!tarea.completadoEn) {
				tarea.completadoEn = new Date().toISOString();
			}
		});

		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	};
}

module.exports = Tareas;
