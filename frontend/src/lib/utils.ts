class Utils {
  static get baseUrl(): string {
    return "http://localhost:1337";
  }
  
  static normalizeCashedArray = (
		array: Array<any>,
		item: any,
		normalLength: number
	): Array<any> | null => {
		if (item && !array?.includes(item) && array?.length < normalLength) {
			const newRecentContact = [...array, item];
			return newRecentContact;
		} else if (item && !array?.includes(item) && array?.length >= normalLength) {
			array?.pop();
			array?.unshift(`${item}`);
			return array;
		} else {
			return null;
		}
	};
}

export default Utils;
