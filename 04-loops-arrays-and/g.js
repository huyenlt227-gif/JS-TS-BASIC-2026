function chuanHoaDanhSachTest(rawRows, config = {}) {
  const { minPriority = 1, maxPriority = 5 } = config;

  let validCases = [];
  let invalidCases = [];
  let seenIds = new Set();
  let duplicateCount = 0;

  for (let i = 0; i < rawRows.length; i++) {
    const [idRaw, moduleRaw, priorityRaw, tagRaw, statusRaw] = rawRows[i];

    const id = idRaw.trim().toUpperCase();
    const module = moduleRaw.trim().toLowerCase();
    const priority = Number(priorityRaw);
    const tag = tagRaw.trim().toLowerCase();
    const status = statusRaw.trim().toLowerCase();

    let errors = [];

    // Kiểm tra ID
    if (!id.startsWith("TC_")) {
      errors.push("ID không bắt đầu bằng TC_");
    }
    if (seenIds.has(id)) {
      errors.push("ID bị trùng");
      duplicateCount++;
    }

    // Kiểm tra module
    if (!module) {
      errors.push("Module rỗng");
    }

    // Kiểm tra priority
    if (priority < minPriority || priority > maxPriority) {
      errors.push(`Priority phải nằm trong khoảng ${minPriority} đến ${maxPriority}`);
    }

    // Kiểm tra status
    if (!(status === "active" || status === "inactive")) {
      errors.push("Status không hợp lệ (chỉ active/inactive)");
    }

    const testCaseObj = { id, module, priority, tag, status };

    if (errors.length === 0) {
      validCases.push(testCaseObj);
    } else {
      invalidCases.push({ ...testCaseObj, errors });
    }

    seenIds.add(id);
  }

  return {
    validCases,
    invalidCases,
    summary: {
      total: rawRows.length,
      valid: validCases.length,
      invalid: invalidCases.length,
      duplicateIds: duplicateCount
    }
  };
}
