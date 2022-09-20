class Utils {
  static get baseUrl(): string {
    return "http://localhost:1337";
  }
  
  static uniqueArray(array: Array<any>) {
		const result = [];
		const map = new Map();
		for (const item of array) {
			if (!map.has(item?.id) && item && Object.keys(item)?.length) {
				map.set(item?.id, true); // set any value to Map
				result.push({
					...item,
				});
			}
		}
		return result;
	}
}

export default Utils;
